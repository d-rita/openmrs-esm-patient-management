import { FetchResponse, openmrsFetch, showNotification, showToast } from '@openmrs/esm-framework';
import { generateCRPayload } from './patient-verification-utils';
import useSWR from 'swr';
import { ConceptAnswers, ConceptResponse, FormValues } from '../patient-registration/patient-registration.types';

export const searchClientRegistry = async (country, identifierNumber) => {
  // searchConfigs -- parameter
  // const query = `${searchConfigs.url}/Patient?identifier=${identifierNumber}`;
  const query = `http://165.232.114.52:8080/fhir/Patient?_pretty=true&address-country=${country}&identifier=${identifierNumber}`;

  try {
    let res = await fetch(query);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// export const RetrieveSearchConfig = (uuid) => {
//   // https://ugandaemr-backend.mets.or.ug/openmrs/ws/rest/v1
//   const apiUrl = `/syncfhirprofile/${uuid}?v=full`;
//   const { data, error, isLoading, isValidating } = useSWR<{ data: { results } }, Error>(apiUrl, openmrsFetch);

//   console.info(data);

//   return {
//     searchConfigs: data,
//     isError: error,
//     isLoading,
//   };
// };

export function savePatientToClientRegistry(formValues: FormValues) {
  const createdRegistryPatient = generateCRPayload(formValues);
  return fetch(`http://165.232.114.52:8080/fhir`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(createdRegistryPatient),
  });
}

export async function handleSavePatientToClientRegistry(
  formValues: FormValues,
  setValues: (values: FormValues, shouldValidate?: boolean) => void,
  inEditMode: boolean,
) {
  try {
    postToRegistry(formValues, setValues);
  } catch (error) {
    showToast({
      title: 'Client registry error',
      description: `${error}`,
      millis: 10000,
      kind: 'error',
      critical: true,
    });
  }
  return;
}

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

async function postToRegistry(
  formValues: FormValues,
  setValues: (values: FormValues, shouldValidate?: boolean) => void,
) {
  try {
    const clientRegistryResponse = await savePatientToClientRegistry(formValues);
    if (clientRegistryResponse.status === 200) {
      setValues({ ...formValues, identifiers: { ...formValues.identifiers } });
      showToast({
        title: 'Posted patient to client registry successfully',
        description: `The patient has been saved to client registry`,
        kind: 'success',
      });
    } else {
      const responseError = await clientRegistryResponse.json();
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
    showNotification({ kind: 'error', title: 'Post failed', description: JSON.stringify(error) });
  }
}
