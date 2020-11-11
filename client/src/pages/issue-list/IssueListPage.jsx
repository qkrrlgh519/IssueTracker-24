import React, { useEffect, useReducer, useState } from 'react';
import IssueContainer from '../../components/issue/IssueContainer';
import Header from '../../components/Header';
import reducer from './reducer';
import MenuContainer from '../../components/issue/MenuContainer';
import { getAllIssues } from '../../lib/axios/issue';
import { getAllLabels } from '../../lib/axios/label';
import { getAllMilestones } from '../../lib/axios/milestone';
import { getCurrentUser, getAllUsers } from '../../lib/axios/user';
import { INIT_DATA } from '../../pages/issue-list/reducer';
import ToolBarContainer from '../../components/issue/ToolBarContainer';
import Spinner from '../../components/common/Spinner';

export const IssuesContext = React.createContext();

const initialState = {
  currentUser: '',
  wholeCheck: false,
  searchText: 'is:open is:issue ',
  renderedIssues: [],
  issues: [],
  labels: [],
  milestones: [],
  users: [],
};

const IssueListPage = () => {
  const [isCompleteRequest, setIsCompleteRequest] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(async () => {
    const [issues, labels, milestones, users, currentUser] = await Promise.all([
      getAllIssues(),
      getAllLabels(),
      getAllMilestones(),
      getAllUsers(),
      getCurrentUser(),
    ]);
    setIsCompleteRequest(true);
    dispatch({
      type: INIT_DATA,
      data: { issues, labels, milestones, users, currentUser },
    });
  }, []);

  if (!isCompleteRequest) return <Spinner />;

  return (
    <IssuesContext.Provider value={{ state, dispatch }}>
      <Header />
      <MenuContainer />
      <ToolBarContainer />
      <IssueContainer />
    </IssuesContext.Provider>
  );
};

export default IssueListPage;
