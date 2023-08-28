const sampleBody = {
  resourceType: 'Bundle',
  type: 'transaction',
  entry: [
    {
      resource: {
        identifier: [
          {
            extension: [
              {
                valueReference: {
                  reference: 'Location/86863db4-6101-4ecf-9a86-5e716d6504e4',
                  display: 'ART Clinic',
                  type: 'Location',
                },
                url: 'http://fhir.openmrs.org/ext/patient/identifier#location',
              },
            ],
            system: 'http://openclientregistry.org/fhir/sourceid',
            use: 'official',
            id: 'a214adbf-8bb8-4b91-939a-3174591314f9',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '05a29f94-c0ed-11e2-94be-8c13b969e334',
                },
              ],
              text: 'OpenMRS ID',
            },
            value: '10000X',
          },
          {
            use: 'usual',
            id: '8074a153-4fba-4681-a6e7-5e6bf4ee2b50',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: 'e1731641-30ab-102d-86b0-7a5022ba4115',
                },
              ],
              text: 'HIV Clinic No.',
            },
            value: '8274862',
          },
          {
            extension: [
              {
                valueReference: {
                  reference: 'Location/629d78e9-93e5-43b0-ad8a-48313fd99117',
                  display: 'Kyanamukaka HC IV',
                  type: 'Location',
                },
                url: 'http://fhir.openmrs.org/ext/patient/identifier#location',
              },
            ],
            use: 'usual',
            id: 'f15c303f-43ef-4d69-a71a-25137a816e4d',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '877169c4-92c6-4cc9-bf45-1ab95faea242',
                },
              ],
              text: 'Patient Unique  ID Code (UIC)',
            },
            value: 'U-0193-1-101508160114X',
          },
        ],
        deceasedBoolean: false,
        address: [],
        managingOrganization: {
          reference: 'Organization/null',
          identifier: {
            system: 'https://hmis.health.go.ug/',
            use: 'official',
            value: 'null',
          },
          display: 'Kyanamukaka HC IV',
          type: 'Organization',
        },
        gender: 'male',
        meta: {
          lastUpdated: '',
        },
        name: [],
        active: true,
        id: '0c1b8ad8-82e6-41fd-9969-74c1809f8d1e',
        birthDate: '1993-01-01',
        resourceType: 'Patient',
      },
      request: {
        method: 'PUT',
        url: 'Patient/0c1b8ad8-82e6-41fd-9969-74c1809f8d1e',
      },
    },
  ],
};

export const nameSkeleton = {
  given: [''],
  use: 'official',
  id: '',
  family: '',
};

export const identifierSkeleton = {
  extension: [
    {
      valueReference: {
        reference: 'Location/629d78e9-93e5-43b0-ad8a-48313fd99117',
        display: '',
        type: 'Location',
      },
      url: 'http://fhir.openmrs.org/ext/patient/identifier#location',
    },
  ],
  use: 'usual',
  id: '',
  type: {
    coding: [
      {
        system: 'UgandaEMR+',
        code: '',
      },
    ],
    text: '',
  },
  value: '',
};

export const addressSkeleton = {
  country: '',
  extension: [
    {
      extension: [
        {
          valueString: '',
          url: 'http://fhir.openmrs.org/ext/address#subcounty',
        },
        {
          valueString: '',
          url: 'http://fhir.openmrs.org/ext/address#parish',
        },
        {
          valueString: '',
          url: 'http://fhir.openmrs.org/ext/address#village',
        },
      ],
      url: 'http://fhir.openmrs.org/ext/address',
    },
  ],
  use: '',
  district: '',
  id: '',
  city: '',
};

export const bodySkeleton = {
  resourceType: 'Bundle',
  type: 'transaction',
  entry: [
    {
      resource: {
        identifier: [],
        deceasedBoolean: false,
        address: [],
        managingOrganization: {},
        gender: '',
        meta: {
          lastUpdated: '',
        },
        name: [],
        active: true,
        id: '',
        birthDate: '',
        resourceType: 'Patient',
      },
      request: {
        method: 'POST',
        url: 'Patient/',
      },
    },
  ],
};
