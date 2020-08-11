import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Dispatch } from 'redux';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loading, Illustration, VerticalLine, toast } from '@pf85-ui';
import useQuery from 'hooks/useQuery';

import DashboardHeader from 'components/DashboardHeader';
import Comment from 'components/Comment/Comment';

import MetaInfo from './MetaInfo';
import SinglePerformanceWrapper from './SinglePerformance.style';
import SinglePerformanceAside from './SinglePerformanceAside';
import CommentEditorForm from './CommentEditorForm';

import { fetchPerformanceWithId } from 'store/ducks/single-performance';
import { StoreState } from 'store';

export const addCommentSchema = yup.object().shape({
  body: yup.string().min(6).max(1000).required(),
});

export interface AuthorProps {
  name: string;
  username: string;
  id?: string;
}

const SinglePerformance: React.FC = () => {
  const query = useQuery();
  const dispatch = useDispatch<Dispatch>();
  const { performanceId } = useParams<any>();


  const performance = useSelector((state: StoreState) => state.singleperformance);
  const [isFetching, fetchError] = useSelector((state: StoreState) => [
    state.loading['singleperformance/FETCH_PERFORMANCE'],
    state.error['singleperformance/FETCH_PERFORMANCE'],
  ]);

  let query_comment_id = query.get('comment_id');
  useEffect(() => {
    dispatch(fetchPerformanceWithId(performanceId)).then(() => {
      // scroll to comment
      if (!query_comment_id) return;
      let comment: any = document?.getElementById(query_comment_id as string);
      comment && window.scrollTo(0, comment.offsetTop);
    });
  }, [performanceId]);


  fetchError && toast.error(fetchError);
  return (
    <SinglePerformanceWrapper>
      {isFetching && <Loading />}
      {fetchError && <Illustration type="error" />}
      {performance?.result && (
        <>
          <section>
            <DashboardHeader>
              <h1>
                {performance.result.title} <span className="color--gray">#{performanceId}</span>
              </h1>
              <MetaInfo
                isOpen={performance.result.isOpen}
                date={performance.result.date_opened}
                author={performance.result.author}
                commentsCount={performance.result?.comments?.length}
              />
            </DashboardHeader>

            <VerticalLine>
              <Comment
                performanceId={performanceId}
                commentId={''} // assumes it's not a comment
                body={performance.result.body}
                author={performance.result.author}
                date={performance.result.date_opened}

              />
              {Object.values(performance.entities.comments || {}).map(
                (comment: any) => (
                  <Comment
                    performanceId={performanceId}
                    commentId={comment.id}
                    key={comment.id}
                    body={comment.body}
                    author={comment.author}
                    date={comment.date}
                    isSelected={query_comment_id === comment.id}
                  />
                )
              )}


              <CommentEditorForm performanceIsOpen={performance.result.isOpen} />
            </VerticalLine>
          </section>
          <section className="singleperformance__aside">
            <SinglePerformanceAside performanceId={performanceId} performance={performance} />
          </section>
        </>
      )}
    </SinglePerformanceWrapper>
  );
};

export default React.memo(SinglePerformance);
