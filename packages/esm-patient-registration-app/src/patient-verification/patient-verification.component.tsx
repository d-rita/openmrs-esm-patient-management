import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, ComboBox, Layer, Button, Search, InlineLoading } from '@carbon/react';
import styles from './patient-verification.scss';
import { countries } from './assets/verification-assets';
import { searchClientRegistry } from './patient-verification-hook';
import { showToast } from '@openmrs/esm-framework';
import { handleClientRegistryResponse } from './patient-verification-utils';
import { FormikProps } from 'formik';
import { FormValues } from '../patient-registration/patient-registration.types';

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
        {t('clientVerificationWithClientRegistry', 'Client verification with client registry')}
      </h3>
      <div style={{ margin: '1rem 0 1rem' }}>
        {/* <Layer>
          {isLoading && <InlineLoading status="active" iconDescription="Loading" description="Loading data..." />}
        </Layer> */}
        <Tile className={styles.verificationWrapper}>
          <Layer>
            <ComboBox
              ariaLabel={t('selectCountry', 'Select country')}
              id="selectCountry"
              items={countries}
              itemToString={(item) => item?.name ?? ''}
              label="Combo box menu options"
              titleText={t('selectCountry', 'Select Country')}
              initialSelectedItem={countries[0]}
              onChange={({ selectedItem }) => {
                return setVerificationCriteria({ ...verificationCriteria, country: selectedItem.name });
              }}
            />
          </Layer>
          <Layer>
            <Search
              id="search-1"
              autoFocus
              placeHolderText="Search"
              // disabled={!verificationCriteria.identifierType}
              onChange={(event) => setVerificationCriteria({ ...verificationCriteria, searchTerm: event.target.value })}
            />
          </Layer>
          {!isLoadingSearch ? (
            <Button disabled={!verificationCriteria.searchTerm} size="md" onClick={handleSearch}>
              {t('validate', 'Validate')}
            </Button>
          ) : (
            <InlineLoading status="active" iconDescription="Loading" description="Searching client registry" />
          )}
        </Tile>
      </div>
    </div>
  );
};

export default PatientVerification;
