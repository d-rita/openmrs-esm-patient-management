import { FetchResponse, openmrsFetch, showNotification, showToast, showModal } from '@openmrs/esm-framework';
import { generateFHIRPayload } from './patient-verification-utils';
import useSWR from 'swr';
import { ConceptAnswers, ConceptResponse, FormValues } from '../patient-registration/patient-registration.types';
import { patientRegistries } from './verification-constants';

export const searchRegistry = async (searchParams) => {
  const { registry, identifier } = searchParams;
  let selectedRegistry = patientRegistries.filter((r) => r.name === registry);
  if (selectedRegistry.length) {
    const query = `${selectedRegistry[0].url}/Patient?identifier=${identifier}`;
    try {
      let res = await fetch(query);
      return await res.json();
    } catch (error) {
      showNotification({ kind: 'error', title: `Error connecting to ${registry}`, description: JSON.stringify(error) });
    }
  }
};

export function useConceptAnswers(conceptUuid: string): { data: Array<ConceptAnswers>; isLoading: boolean } {
  const { data, error, isLoading } = useSWR<FetchResponse<ConceptResponse>, Error>(
    `/ws/rest/v1/concept/${conceptUuid}`,
    openmrsFetch,
  );
  if (error) {
    showToast({
      title: error.name,
      description: error.message,
      kind: 'error',
    });
  }
  return { data: data?.data?.answers ?? [], isLoading };
}

export function savePatientToRegistry(formValues: FormValues, registry) {
  const createdRegistryPatient = generateFHIRPayload(formValues);
  let selectedRegistry = patientRegistries.filter((r) => r.name === registry);
  if (selectedRegistry.length) {
    return fetch(`${selectedRegistry[0].url}/fhir`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(createdRegistryPatient),
    });
  }
}

async function postToRegistry(
  formValues: FormValues,
  setValues: (values: FormValues, shouldValidate?: boolean) => void,
  selectedRegistry,
) {
  try {
    const registryResponse = await savePatientToRegistry(formValues, selectedRegistry);
    if (registryResponse.status === 200) {
      setValues({ ...formValues, identifiers: { ...formValues.identifiers } });
      showToast({
        title: `Posted patient to ${selectedRegistry} successfully`,
        description: `The patient has been saved to ${selectedRegistry}`,
        kind: 'success',
      });
    } else {
      const responseError = await registryResponse.json();
      const errorMessage = Object.values(responseError.errors ?? {})
        .map((error: any) => error.join())
        .toString();
      setValues({
        ...formValues,
        attributes: {
          ...formValues.attributes,
          ['869f623a-f78e-4ace-9202-0bed481822f5']: 'Failed validation',
          ['752a0331-5293-4aa5-bf46-4d51aaf2cdc5']: 'Failed',
        },
      });
      showNotification({
        title: responseError.title,
        description: errorMessage,
        kind: 'warning',
        millis: 1500000,
      });
    }
  } catch (error) {
    showNotification({
      kind: 'error',
      title: `Post to ${selectedRegistry} failed`,
      description: JSON.stringify(error),
    });
  }
}

export async function handleSavePatientToRegistry(
  formValues: FormValues,
  setValues: (values: FormValues, shouldValidate?: boolean) => void,
  selectedRegistry,
) {
  try {
    postToRegistry(formValues, setValues, selectedRegistry);
  } catch (error) {
    showToast({
      title: `${selectedRegistry} error`,
      description: `${error}`,
      millis: 10000,
      kind: 'error',
      critical: true,
    });
  }
  return;
}
