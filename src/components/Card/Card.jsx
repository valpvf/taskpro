import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EllipsisText from 'react-ellipsis-text';
import PropTypes from 'prop-types';
import ModalCard from 'components/ModalCard/ModalCard';
import ModalProgress from 'components/ModalProgress/ModalProgress';
import ModalConfirm from 'shared/components/modalConfirm/ModalConfirm';
import { deleteCard } from 'redux/task/taskOperations';
import sprite from '../../images/sprite.svg';
import {
  Title,
  CardWrapper,
  SubTitle,
  PrioryTitle,
  PriorySubTitle,
  PriorityWrapper,
  Ball,
  DeadlineSubTitle,
  DeadlineTitle,
  Line,
  Icon,
  IconWrapper,
  Bell,
} from './Card.styled';

const Card = ({ task = {}, columnID }) => {
  const {
    title = ' ',
    description = ' ',
    priority = 'Without',
    deadline = '1/1/2023',
    _id = '',
  } = task;

  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log('id', _id, columnID, task);
    dispatch(deleteCard({ _id, columnID }));
    setShowConfirm(false);
  };

  // console.log('columnId', columnID);

  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOpen = () => {
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  const onOpen = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const onOpenProgress = () => {
    setShowProgressModal(true);
  };
  const onCloseProgress = () => {
    setShowProgressModal(false);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const today = new Date();
  const formattedDate = formatDate(today); // Output: "07/28/23" (if today is July 28, 2023)
  const deadlineDate = formatDate(new Date(deadline.split('T')[0]));

  return (
    <CardWrapper priority={priority}>
      <div>
        <Title>
          <EllipsisText text={title} length={'35'} />
        </Title>
        <SubTitle>
          <EllipsisText text={description} length={'37'} />
        </SubTitle>
        <Line />
        <PriorityWrapper>
          <div>
            <PrioryTitle>Priority</PrioryTitle>
            <PriorySubTitle>
              <Ball priority={priority} />
              {priority}
            </PriorySubTitle>
          </div>
          <div>
            <DeadlineTitle>Deadline</DeadlineTitle>
            <DeadlineSubTitle>{deadlineDate}</DeadlineSubTitle>
          </div>
          <IconWrapper isEqualDate={deadlineDate === formattedDate}>
            {deadlineDate === formattedDate && (
              <Bell width="16px" height="16px">
                <use xlinkHref={`${sprite}#icon-bell`} />
              </Bell>
            )}
            <Icon width="16px" height="16px" onClick={onOpenProgress}>
              <use xlinkHref={`${sprite}#icon-goto`} />
            </Icon>
            {showProgressModal && (
              <ModalProgress
                onCloseProgress={onCloseProgress}
                id={[_id, columnID]}
              />
            )}
            <Icon width="16px" height="16px" onClick={onOpen}>
              <use xlinkHref={`${sprite}#icon-pencil`} />
            </Icon>
            {showModal && (
              <ModalCard
                onClose={onClose}
                title="Edit card"
                btnName="Edit"
                cardTitle={title}
                cardDescription={description}
                currentPriority={priority}
                deadline={deadline}
                column={columnID}
                taskId={_id}
              />
            )}
            <Icon width="16px" height="16px" onClick={handleOpen}>
              <use xlinkHref={`${sprite}#icon-trash`} />
            </Icon>
          </IconWrapper>
        </PriorityWrapper>
        {showConfirm && (
          <ModalConfirm onClose={handleClose} onConfirm={handleDelete} />
        )}
      </div>
    </CardWrapper>
  );
};

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
};

export default Card;
