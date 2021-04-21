import { createShallow } from '@material-ui/core/test-utils';

import React from 'react';
import { ResultsTopPlayerTable } from '../components/pastResults/resultsTopPlayerTable';
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
export const testResultsTopPlayerTable = () => {
  describe('Results Table', () => {
    let shallow;

    const results = [];
    const questionDetails = [];

    beforeEach(() => {
      shallow = createShallow();
    });

    it('table has 5 <TableRow /> components', () => {
      const topPlayerTable = shallow(<ResultsTopPlayerTable />);
      console.log(topPlayerTable.debug());
      expect(topPlayerTable.find(TableRow)).to.have.lengthOf(5);
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
