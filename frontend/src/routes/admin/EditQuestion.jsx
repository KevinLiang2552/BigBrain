import React from 'react';
import { useParams } from 'react-router';

export const EditQuestionPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div>{id}</div>
    </div>
  );
};
