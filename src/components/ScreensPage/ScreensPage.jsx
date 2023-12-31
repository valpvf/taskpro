import {
  Container,
  ScreensHeader,
  HeaderTxt,
  HeaderFiltres,
  IconFiltre,
  AddColumn,
  IconPlus,
  ButtonAdd,
  ColumnsContainer,
  TutorialTitle,
  TutorialContainer,
  TutorialSelected,
  HeaderAddColumn,
  IconPlusFilters,
  ColumnWrapper,
  HeadersWrapper,
} from './ScreensPageStyled';
import icons from '../../images/sprite.svg';
import { useEffect, useState } from 'react';
import Card from 'components/Card/Card';
import ModalColumn from 'components/ModalColumn/ModalColumn';
import ModalFilters from 'components/ModalFilters/ModalFilters';
import ButtonMain from 'shared/components/button/Button';
import { BlackPlusButton } from 'shared/components/plusButton/PlusButtons';
import ModalCard from 'components/ModalCard/ModalCard';
import { useSelector } from 'react-redux';
import { getBoardBg, getBoardName, getColumn } from 'redux/task/taskSelectors';
import Column from 'components/Column/Column';
import { getBoard } from 'redux/auth/authSelectors';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';

const ScreensPage = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalAddCard, setShowModalAddCard] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('');

  const [colId, setColId] = useState('');
  const boardBg = useSelector(getBoardBg);
  const boards = useSelector(getBoard);
  const columns = useSelector(getColumn);

  const isBoardActive = boards.find(board => board.isActive);

  const [headerSize, setHeaderSize] = useState(true);

  const handleWindowResize = () => {
    if (window.innerWidth > 375) {
      setHeaderSize(true);
    } else {
      setHeaderSize(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const boardName = useSelector(getBoardName);
  const column = useSelector(getColumn)?.toSorted((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  const isView = false;

  const onFilter = e => {
    setPriorityFilter(e.target.value);
  };

  const onOpen = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const onOpenAddCard = e => {
    setColId(e);
    setShowModalAddCard(true);
  };
  const onCloseAddCard = () => {
    setShowModalAddCard(false);
  };

  const onOpenFilters = () => {
    setShowFilters(true);
  };
  const onCloseFilters = () => {
    setShowFilters(false);
  };

  return boards.length ? (
    <Container picture={boardBg} isBoardActive>
      <ScreensHeader>
        {isBoardActive && (
          <HeaderTxt>
            {headerSize ? (
              boardName ?? ''
            ) : (
              <EllipsisText text={boardName ?? ''} length={15} />
            )}
          </HeaderTxt>
        )}

        <HeadersWrapper>
          {isBoardActive && columns.length !== 0 && (
            <HeaderAddColumn onClick={() => setShowModal(true)}>
              <IconPlusFilters>
                <use href={`${icons}#icon-plus`}></use>
              </IconPlusFilters>
              <div>Add column</div>
            </HeaderAddColumn>
          )}
          {isBoardActive && (
            <HeaderFiltres onClick={onOpenFilters}>
              <IconFiltre>
                <use href={`${icons}#icon-filter`}></use>
              </IconFiltre>
              <div>Filtres</div>
              {showFilters && (
                <ModalFilters onClose={onCloseFilters} onClick={onFilter} />
              )}
            </HeaderFiltres>
          )}
        </HeadersWrapper>
      </ScreensHeader>
      {isBoardActive && columns.length === 0 && (
        <AddColumn>
          <ButtonAdd type="button" onClick={onOpen}>
            <IconPlus>
              <use href={`${icons}#icon-plus`}></use>
            </IconPlus>
            {column?.length === 0 ? 'Add column' : 'Add another column'}
          </ButtonAdd>
        </AddColumn>
      )}
      {isBoardActive && boardName && (
        <ColumnsContainer>
          {column?.map(el => (
            <div key={el._id}>
              <Column title={el.title} columnId={el._id} />
              <ColumnWrapper>
                {el.tasks?.length === 0
                  ? isView && <Card columnID={el._id} />
                  : el.tasks
                      ?.filter(card => card?.priority.includes(priorityFilter))
                      .toSorted((a, b) =>
                        b.updatedAt.localeCompare(a.updatedAt)
                      )
                      .map(task => (
                        <Card key={task._id} task={task} columnID={el._id} />
                      ))}
              </ColumnWrapper>
              <ButtonMain
                type="button"
                onClick={() => onOpenAddCard(el._id)}
                value={el._id}
                name="columnId"
              >
                <BlackPlusButton />
                {el.tasks?.length === 0 ? 'Add card' : 'Add another card'}
              </ButtonMain>
            </div>
          ))}
        </ColumnsContainer>
      )}
      {showModal && (
        <ModalColumn
          onClose={onClose}
          title="Add column"
          btnName="Add"
          columnTitle={title}
        />
      )}
      {showModalAddCard && (
        <ModalCard
          onClose={onCloseAddCard}
          title="Add card"
          btnName="Add"
          column={colId}
        />
      )}
    </Container>
  ) : (
    <TutorialContainer>
      <TutorialTitle>
        Before starting your project, it is essential{' '}
        <TutorialSelected>to create a board</TutorialSelected> to visualize and
        track all the necessary tasks and milestones. This board serves as a
        powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </TutorialTitle>
    </TutorialContainer>
  );
};

export default ScreensPage;
