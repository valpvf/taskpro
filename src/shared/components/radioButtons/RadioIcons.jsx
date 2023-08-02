import { nanoid } from 'nanoid';
import sprite from '../../../images/sprite.svg';
import {
  StyledInput,
  StyledLabel,
  StyledRadioWrapper,
  StyledSVG,
} from './RadioIcons.styled';
import { useState } from 'react';

const RadioIcons = ({ onChangeIcon }) => {
  const icons = [
    'icon-project',
    'icon-star',
    'icon-loading',
    'icon-puzzle',
    'icon-container',
    'icon-lightning',
    'icon-colors',
    'icon-hexagon',
  ];

  const [selectedValue, setSelectedValue] = useState('');
  // console.log('selectedValue in useState', selectedValue);

  const handleRadioChange = icon => {
    setSelectedValue(icon);
    onChangeIcon(icon);
    // console.log('selectedValue in handleRadioChange', selectedValue);
  };

  return (
    <StyledRadioWrapper>
      {icons.map(icon => {
        const id = nanoid();
        return (
          <StyledLabel key={id}>
            <StyledInput
              type="radio"
              value={icon}
              name="icon"
              checked={selectedValue === icon}
              onChange={() => handleRadioChange(icon)}
            />
            <StyledSVG>
              <use href={`${sprite}#${icon}`} />
            </StyledSVG>
          </StyledLabel>
        );
      })}
    </StyledRadioWrapper>
  );
};

export default RadioIcons;
