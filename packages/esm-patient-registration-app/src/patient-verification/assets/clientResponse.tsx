const sampleResponse = {
  resourceType: 'Bundle',
  id: 'cea2ef12-9d3c-4c1d-b989-acc07c0fb5fb',
  meta: {
    lastUpdated: '2023-08-28T12:03:15.990+00:00',
  },
  type: 'searchset',
  total: 1,
  link: [
    {
      relation: 'self',
      url: 'http://165.232.114.52:8080/fhir/Patient?_pretty=true&address-country=Uganda&identifier=UG-0900-1-130514110120X',
    },
  ],
  entry: [
    {
      fullUrl: 'http://165.232.114.52:8080/fhir/Patient/e26977bd-bfd6-4cde-a049-581dfd0ae548',
      resource: {
        resourceType: 'Patient',
        id: 'e26977bd-bfd6-4cde-a049-581dfd0ae548',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-13T13:29:11.119+00:00',
          source: '#WZbSqA6gos9VDDcj',
        },
        contained: [
          {
            resourceType: 'Provenance',
            id: '6da6de3d-5a4e-4a1e-bcdb-1a4fe10a54c8',
            recorded: '2023-06-23T13:29:56.000+03:00',
            activity: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystemv3-DataOperation',
                  code: 'CREATE',
                  display: 'create',
                },
              ],
            },
            agent: [
              {
                type: {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystemprovenance-participant-type',
                      code: 'author',
                      display: 'Author',
                    },
                  ],
                },
                role: [
                  {
                    coding: [
                      {
                        system: 'http://terminology.hl7.org/CodeSystemv3-ParticipationType',
                        code: 'AUT',
                        display: 'author',
                      },
                    ],
                  },
                ],
                who: {
                  reference: 'Practitioner/1c3db49d-440a-11e6-a65c-00e04c680037',
                  type: 'Practitioner',
                  display: 'Super User',
                },
              },
            ],
          },
        ],
        identifier: [
          {
            id: 'UG-TLC-965',
            use: 'official',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '05a29f94-c0ed-11e2-94be-8c13b969e334',
                },
              ],
              text: 'OpenMRS ID',
            },
            system: 'http://openclientregistry.org/fhir/sourceid',
            value: '1001YX',
          },
          {
            id: '1b4c5579-7ff4-469e-aa37-74bdd4b237ef',
            use: 'usual',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '877169c4-92c6-4cc9-bf45-1ab95faea242',
                },
              ],
              text: 'Patient Unique  ID Code (UIC)',
            },
            value: 'UG-0900-1-130514110120X',
          },
        ],
        active: true,
        name: [
          {
            id: 'b7513e88-f9bd-406a-ad7b-4f2cfc9102b7',
            use: 'official',
            family: 'Kato',
            given: ['Menya'],
          },
        ],
        gender: 'male',
        birthDate: '2000-09-01',
        deceasedBoolean: false,
        address: [
          {
            id: '890d4fda-878e-4ca0-a15e-426a8e52ff87',
            use: 'home',
            city: 'Kampala',
            country: 'Uganda',
          },
        ],
        managingOrganization: {
          reference: 'Organization/null',
          type: 'Organization',
          identifier: {
            use: 'official',
            system: 'https://hmis.health.go.ug/',
            value: 'null',
          },
          display: 'Health Center Name',
        },
      },
      search: {
        mode: 'match',
      },
    },
  ],
};

const responseSkeleton = {
  resourceType: 'Bundle',
  id: 'cea2ef12-9d3c-4c1d-b989-acc07c0fb5fb',
  meta: {
    lastUpdated: '2023-08-28T12:03:15.990+00:00',
  },
  type: 'searchset',
  total: 1,
  link: [
    {
      relation: 'self',
      url: 'http://165.232.114.52:8080/fhir/Patient?_pretty=true&address-country=Uganda&identifier=UG-0900-1-130514110120X',
    },
  ],
  entry: [
    {
      fullUrl: 'http://165.232.114.52:8080/fhir/Patient/e26977bd-bfd6-4cde-a049-581dfd0ae548',
      resource: {
        resourceType: 'Patient',
        id: 'e26977bd-bfd6-4cde-a049-581dfd0ae548',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-13T13:29:11.119+00:00',
          source: '#WZbSqA6gos9VDDcj',
        },
        contained: [
          {
            resourceType: 'Provenance',
            id: '6da6de3d-5a4e-4a1e-bcdb-1a4fe10a54c8',
            recorded: '2023-06-23T13:29:56.000+03:00',
            activity: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystemv3-DataOperation',
                  code: 'CREATE',
                  display: 'create',
                },
              ],
            },
            agent: [
              {
                type: {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystemprovenance-participant-type',
                      code: 'author',
                      display: 'Author',
                    },
                  ],
                },
                role: [
                  {
                    coding: [
                      {
                        system: 'http://terminology.hl7.org/CodeSystemv3-ParticipationType',
                        code: 'AUT',
                        display: 'author',
                      },
                    ],
                  },
                ],
                who: {
                  reference: 'Practitioner/1c3db49d-440a-11e6-a65c-00e04c680037',
                  type: 'Practitioner',
                  display: 'Super User',
                },
              },
            ],
          },
        ],
        identifier: [
          {
            id: 'UG-TLC-965',
            use: 'official',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '05a29f94-c0ed-11e2-94be-8c13b969e334',
                },
              ],
              text: 'OpenMRS ID',
            },
            system: 'http://openclientregistry.org/fhir/sourceid',
            value: '1001YX',
          },
          {
            id: '1b4c5579-7ff4-469e-aa37-74bdd4b237ef',
            use: 'usual',
            type: {
              coding: [
                {
                  system: 'UgandaEMR',
                  code: '877169c4-92c6-4cc9-bf45-1ab95faea242',
                },
              ],
              text: 'Patient Unique  ID Code (UIC)',
            },
            value: 'UG-0900-1-130514110120X',
          },
        ],
        active: true,
        name: [
          {
            id: 'b7513e88-f9bd-406a-ad7b-4f2cfc9102b7',
            use: 'official',
            family: 'Kato',
            given: ['Menya'],
          },
        ],
        gender: 'male',
        birthDate: '2000-09-01',
        deceasedBoolean: false,
        address: [
          {
            id: '',
            use: '',
            city: 'Kampala',
            country: 'Uganda',
          },
        ],
        managingOrganization: {
          reference: '',
          type: '',
          identifier: {
            use: '',
            system: 'https://hmis.health.go.ug/',
            value: '',
          },
          display: 'Health Center Name',
        },
      },
      search: {
        mode: 'match',
      },
    },
  ],
};
