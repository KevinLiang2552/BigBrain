import { createShallow } from '@material-ui/core/test-utils';

import React from 'react';
import { ResultsTopPlayerTable } from '../components/pastResults/resultsTopPlayerTable';
export const testResultsTopPlayerTable = () => {
  describe('Results Table', () => {
    let shallow;

    const results = [];
    const questionDetails = [];

    beforeEach(() => {
      shallow = createShallow();
    });

    it('top player table renders correctly', () => {
      const topPlayerTable = shallow(
        <ResultsTopPlayerTable
          results={results}
          questionDetails={questionDetails}
        />,
      );
      expect(topPlayerTable).toMatchSnapshot();
    });
  });
};

export default testResultsTopPlayerTable;
