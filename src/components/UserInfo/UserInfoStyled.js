import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 14px;
`;

export const AvasarSetin = styled.div`
  position: relative;
  cursor: pointer;
`;

export const IconAvatar = styled.svg`
  width: 32px;
  height: 32px;
  border: 1px solid var(--avatar-border-color);
  border-radius: 5px;
  fill: var(--user-icon-fill-color);
  stroke: var(--user-icon-stroke-color);
  &:hover {
    box-shadow: 0px 6px 7px 1px var(--user-edit-icon-plus-hover-color);
  }
`;

export const IconPlus = styled.svg`
  position: absolute;
  width: 12px;
  height: 12px;
  fill: var(--user-icon-plus-fill-color);
  stroke: var(--user-icon-plus-stroke-color);
  top: 27px;
  left: 10px;
`;

export const AvatarImg = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  &:hover {
    box-shadow: 0px 6px 7px 1px var(--user-edit-icon-plus-hover-color);
  }
`;
