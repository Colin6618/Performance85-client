import React from 'react';
import styled from 'styled-components';
import { Flex } from '@pf85-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledFooter = styled.footer`
  font-size: 14px;
  padding: ${p => p.theme.space.large}px ${p => p.theme.space.huge}px;
  border-top: 1px solid ${p => p.theme.colors.offwhite};
  color: ${p => p.theme.colors.gray};

  a {
    font-size: 14px;
    color: ${p => p.theme.colors.gray};
    line-height: 0;
    svg {
      font-size: 22px;
    }
  }
  a:hover {
    color: ${p => p.theme.colors.primary};
  }

  span {
    margin-left: auto;
  }
  @media screen and (${p => p.theme.media.mobile}) {
    .footer__flex {
      justify-content: center;
      span {
        margin-bottom: 5px;
        margin-left: 0;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Flex className="footer__flex" gap="medium" align="center">
        <span>
          Made by 
          <a href="https://github.com/Colin6618/Performance85"> Colin Han with a buttock pain.</a>
        </span>
        <a href="https://github.com/Colin6618/Performance85">
          <FontAwesomeIcon icon={['fab', 'github']} />
        </a>
      </Flex>
    </StyledFooter>
  );
};

export default Footer;
