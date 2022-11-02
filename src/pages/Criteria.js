import React from 'react';
import Grid from '@mui/material/Grid';
import criteriaGroups from '../constants/criteria';
import CriteriaGroup from '../components/criteria/CriteriaGroup';
import Page from '../components/layout/Page';
import { SMALL_CARD_SIZE } from '../config/components.constants';
export default function Criteria() {
  return (
    <Page title="Criteria">
      <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: SMALL_CARD_SIZE }}>
          <Grid container flexDirection="column" spacing={4}>
            {criteriaGroups.map((criteriaGroup, index) => (
              <Grid key={`criteria-group-${index}`} item>
                <CriteriaGroup criteria={criteriaGroup.criteria} name={criteriaGroup.name} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
