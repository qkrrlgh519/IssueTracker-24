import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import IssueItemHeader from './IssueItemHeader';
import { IssueContext } from '../../../pages/IssueDetailPage';
import ContentButtonContainer from './ContentButtonContainer';
import GreenButton from '../../common/GreenButton';
import GreyButton from '../../common/GreyButton';
import { patchIssue } from '../../../lib/axios/issue';
import FileContainer from './FileContainer';

export const IssueContentWrapper = styled.div`
  width: 100%;
  border: 1px solid #e8e9ec;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
  padding: 20px;
  font-size: 15px;
`;

export const WriteLabel = styled.div`
  width: 80px;
  text-align: center;
  position: relative;
  bottom: 60px;
  height: 40px;
  background-color: white;
  border: 1px solid #e8e9ec;
  border-radius: 4px 4px 0 0;
  border-bottom: 0;
  box-sizing: border-box;
  padding-top: 9px;
  padding-left: 7px;
  padding-right: 7px;
`;

export const IssueContent = styled.textarea`
  width: 100%;
  height: 150px;
  margin-top: -40px;
  resize: none;
  box-sizing: border-box;
  border: 1px solid #eaecef;
  border-radius: 4px;
  background-color: #fafbfc;
  font-size: 15px;
  &:focus {
    outline: none;
    border: 0.5px solid #0366d6;
    border-radius: 0 4px 4px 0;
    box-shadow: 0px 0px 2.5px 2.5px #b3d1f3;
  }
`;

const IssueForm = ({ onClickCancel }) => {
  const [content, setContent] = useState('');
  const { issue, setIssue } = useContext(IssueContext);
  useEffect(() => {
    setContent(issue.content);
  }, []);

  const onChangeContent = (e) => setContent(e.target.value);

  const onClickUpdate = async () => {
    await patchIssue(issue.id, { content });
    setIssue({ ...issue, content });
    onClickCancel();
  };

  return (
    <>
      <IssueItemHeader />
      <IssueContentWrapper>
        <WriteLabel>Write</WriteLabel>
        <IssueContent value={content} onChange={onChangeContent} />
        <FileContainer />
        <ContentButtonContainer>
          <GreyButton text={'Cancel'} color={'red'} func={onClickCancel} />
          <GreenButton text={'Update comment'} func={onClickUpdate} />
        </ContentButtonContainer>
      </IssueContentWrapper>
    </>
  );
};

export default IssueForm;
