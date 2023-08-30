import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '@openmrs/esm-framework';
import { Button, InlineLoading, Layer, Search, Select, SelectItem, Tile } from '@carbon/react';
import { FormikProps } from 'formik';
import { countries } from './assets/verification-assets';
import { searchClientRegistry } from './patient-verification-hook';
import { handleClientRegistryResponse } from './patient-verification-utils';
import { FormValues } from '../patient-registration/patient-registration.types';
import styles from './patient-verification.scss';

interface PatientVerificationProps {
  props: FormikProps<FormValues>;
}

const PatientVerification: React.FC<PatientVerificationProps> = ({ props }) => {
  const { t } = useTranslation();
  // const { data, isLoading, error } = useGlobalProperties();
  const [verificationCriteria, setVerificationCriteria] = useState({
    searchTerm: '',
    country: countries[0]['name'],
  });
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const handleSearch = async () => {
    setIsLoadingSearch(true);
    try {
      const clientRegistryResponse = await searchClientRegistry(
        verificationCriteria.country,
        verificationCriteria.searchTerm,
      );
      setIsLoadingSearch(false);
      handleClientRegistryResponse(clientRegistryResponse, props, verificationCriteria.searchTerm);
    } catch (error) {
      showToast({
        title: 'Client registry error',
        description: `Please reload the registration page and re-try again, if the issue persist contact system administrator`,
        millis: 10000,
        kind: 'error',
        critical: true,
      });
      setIsLoadingSearch(false);
    }
  };

  // if (error) {
  //   return (
  //     <Tile className={styles.errorWrapper}>
  //       <p>Error occurred while reaching the client registry, please proceed with registration and try again later</p>
  //     </Tile>
  //   );
  // }

  return (
    <div id={'patientVerification'}>
      <h3 className={styles.productiveHeading02} style={{ color: '#161616' }}>
        {t('clientVerificationWithClientRegistry', 'Client registry verification')}
      </h3>
      <div style={{ margin: '1rem 0 1rem' }}>
        <Tile>
          <div className={styles.verificationWrapper}>
            <Layer className={styles.layer}>
              <Select
                ariaLabel={t('selectCountry', 'Select country')}
                id="selectCountry"
                items={countries}
                itemToString={(item) => item?.name ?? ''}
                labelText={t('selectCountry', 'Select Country')}
                initialSelectedItem={countries[0]}
                onChange={(event) => {
                  return setVerificationCriteria({ ...verificationCriteria, country: event.target.value });
                }}>
                {countries.map((country) => (
                  <SelectItem key={country.name} text={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </Select>
            </Layer>
            <Layer className={styles.layer}>
              <Search
                id="registrySearch"
                autoFocus
                placeholder="Enter identifier"
                // disabled={!verificationCriteria.identifierType}
                onChange={(event) =>
                  setVerificationCriteria({ ...verificationCriteria, searchTerm: event.target.value })
                }
              />
            </Layer>
            <div>
              {!isLoadingSearch ? (
                <Button disabled={!verificationCriteria.searchTerm} size="md" onClick={handleSearch}>
                  {t('validate', 'Validate')}
                </Button>
              ) : (
                <InlineLoading status="active" iconDescription="Loading" description="Searching client registry" />
              )}
            </div>
          </div>
        </Tile>
      </div>
    </div>
  );
};

export default PatientVerification;
