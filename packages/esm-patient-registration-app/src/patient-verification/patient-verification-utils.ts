import { showModal } from '@openmrs/esm-framework';
import { FormikProps } from 'formik';
import {
  Address,
  ClientPostBody,
  ClientRegistryResponse,
  CRPatientDetails,
  Extension,
  PatientResource,
  PostToRegistryBody,
} from './verification-types';
import counties from './assets/counties.json';
import { FormValues } from '../patient-registration/patient-registration.types';
import { format } from 'prettier';

export function handleClientRegistryResponse(
  clientResponse: ClientRegistryResponse,
  props: FormikProps<FormValues>,
  searchTerm: string,
) {
  if (clientResponse?.total === 0) {
    const dispose = showModal('empty-client-registry-modal', {
      onConfirm: () => {
        props.setValues({ ...props.values, identifiers: { ...props.values.identifiers } });
        dispose();
      },
      close: () => dispose(),
    });
  }

  if (clientResponse?.total === 1) {
    const {
      resource: { identifier, name, gender, birthDate, deceasedBoolean, address },
    } = clientResponse.entry[0];

    const { family, given } = name[0];

    const { city, country } = address[0];

    const dispose = showModal('confirm-client-registry-modal', {
      onConfirm: () => {
        props.setValues({
          ...props.values,
          familyName: family,
          middleName: given[1]?.length ? given[1] : '',
          givenName: given[0],
          gender: gender,
          birthdate: new Date(birthDate),
          isDead: deceasedBoolean,
          address: {
            address1: city,
            country: country,
          },
          identifiers: { ...props.values.identifiers },
        });
        dispose();
      },
      close: () => dispose(),
      patient: clientResponse.entry[0]['resource'],
    });
  }
}

const extractAddress = function (formAddressValue) {
  let address: Address = {
    extension: [],
  };
  let extension = [];
  if (formAddressValue['country']) {
    address.country = formAddressValue['country'];
  }
  if (formAddressValue['city']) {
    address.city = formAddressValue['city'];
  }
  if (formAddressValue['countyDistrict']) {
    address.district = formAddressValue['countyDistrict'];
  }
  if (formAddressValue['stateProvince']) {
    extension.push({
      valueString: formAddressValue['stateProvince'],
      url: 'http://fhir.openmrs.org/ext/address#county',
    });
  }
  if (formAddressValue['address3']) {
    extension.push({
      valueString: formAddressValue['address3'],
      url: 'http://fhir.openmrs.org/ext/address#subcounty',
    });
  }
  if (formAddressValue['address4']) {
    extension.push({
      valueString: formAddressValue['address4'],
      url: 'http://fhir.openmrs.org/ext/address#parish',
    });
  }
  if (formAddressValue['address5']) {
    extension.push({
      valueString: formAddressValue['address5'],
      url: 'http://fhir.openmrs.org/ext/address#village',
    });
  }
  if (extension.length) {
    address.extension.push({
      extension: extension,
    });
  } else {
    delete address.extension;
  }

  return address;
};

const extractIdentifiers = (identifiers) => {
  let arr = [];
  Object.values(identifiers).forEach((id) => {
    arr.push({
      use: 'usual',
      id: id['identifierTypeUuid'],
      type: {
        text: id['identifierName'],
      },
      value: id['identifierValue'],
    });
  });
  return arr;
};

export function generateCRPayload(formValues: FormValues): ClientPostBody {
  let clientPostBody: ClientPostBody = {
    resourceType: 'Bundle',
    type: 'transaction',
    entry: [
      {
        resource: {
          name: [
            {
              family: formValues?.familyName,
              given: [formValues?.givenName, formValues?.middleName],
            },
          ],
          gender: formValues?.gender.toLowerCase(),
          birthDate: new Date(formValues?.birthdate).toISOString(),
          deceasedBoolean: !formValues?.isDead,
          address: [extractAddress(formValues.address)],
          identifier: extractIdentifiers(formValues.identifiers),
          resourceType: 'Patient',
        },
        request: {
          method: 'PUT',
          url: `Patient/${formValues.patientUuid}`,
        },
      },
    ],
  };
  return clientPostBody;
}
