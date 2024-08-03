import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { assets } from '@/config/assets';
import Tabs from '@/components/Atoms/Tabs/Tabs';

export default {
  title: 'Table',
  component: Table
};

const tabOptions = [
  {
    label: 'All Bets',
    isActive: true,
    name: 'all_bets'
  },
  {
    label: 'High Roller',
    isActive: false,
    name: 'high_roller'
  },
  {
    label: 'Lucky Bets',
    isActive: false,
    name: 'lucky_bets'
  },
  {
    label: 'Hall of Fame',
    isActive: false,
    name: 'hall_of_fame'
  }
];

const BetsIcon = () => {
  return (
    <svg
      width={30}
      height={30}
      viewBox="15 10 30 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin slice"
    >
      <g filter="url(#filter0_d_1285_2472)">
        <path
          d="M29.5286 34C27.7308 33.8966 26.0208 33.1882 24.6766 31.99L26.3472 30.3194C27.244 31.0801 28.3565 31.541 29.5286 31.6374V34ZM24.01 31.3234C22.8118 29.9792 22.1034 28.2692 22 26.4714H24.3626C24.459 27.6435 24.9199 28.756 25.6806 29.6528L24.01 31.3234ZM22 25.5286C22.1034 23.7308 22.8118 22.0208 24.01 20.6766L25.6806 22.3472C24.9199 23.244 24.459 24.3565 24.3626 25.5286H22ZM24.6766 20.01C26.0208 18.8118 27.7308 18.1034 29.5286 18V20.3626C28.3565 20.459 27.244 20.9199 26.3472 21.6806L24.6766 20.01ZM30.4714 18C32.2692 18.1034 33.9792 18.8118 35.3234 20.01L33.6528 21.6806C32.756 20.9199 31.6435 20.459 30.4714 20.3626V18ZM35.99 20.6766C37.1882 22.0208 37.8966 23.7308 38 25.5286H35.6374C35.541 24.3565 35.0801 23.244 34.3194 22.3472L35.99 20.6766ZM38 26.4714C37.8966 28.2692 37.1882 29.9792 35.99 31.3234L34.3194 29.6528C35.0801 28.756 35.541 27.6435 35.6374 26.4714H38ZM35.3234 31.99C33.9792 33.1882 32.2692 33.8966 30.4714 34V31.6374C31.6435 31.541 32.756 31.0801 33.6528 30.3194L35.3234 31.99ZM30 30.7139C27.3965 30.7139 25.2861 28.6035 25.2861 26C25.2861 23.3965 27.3965 21.2861 30 21.2861C32.6035 21.2861 34.7139 23.3965 34.7139 26C34.7139 28.6035 32.6035 30.7139 30 30.7139Z"
          fill="#8563E4"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1285_2472"
          x="0"
          y="0"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="11" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1285_2472" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1285_2472"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const mockData = [
  {
    game: {
      name: 'Hot Nudge',
      imageURL: 'hot_nudge_game.svg'
    },
    clan: {
      name: 'King 007',
      image: 'clan_logo_1.svg'
    },
    time: '2s',
    wager: '25.00',
    multiplier: '20.00',
    payout: '50.00'
  },
  {
    game: {
      name: 'Legion X',
      imageURL: 'legion_x_game.svg'
    },
    clan: {
      name: 'NotShoony',
      image: 'clan_logo_2.svg'
    },
    time: '3s',
    wager: '30.00',
    multiplier: '1.65',
    payout: '40.40'
  }
];

const TableParent = styled(Table.Parent)`
  background: var(--very-dark-violet);
`;

const Title = styled('p')`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: var(--white);
  display: flex;
  align-items: center;
  flex: 1;
`;

const TitleMobile = styled(Title)`
  padding: 12px 0px 12px 16px;
  background: var(--very-dark-violet-200);
  border-radius: 6px 6px 0px 0px;
  align-items: center;
  flex: 0;
`;

const TabsMobile = styled(Tabs)`
  background: var(--very-dark-violet-300);
  padding: 12px 0px 12px 12px;
`;

const FlexData = styled('div')`
  display: flex;
  align-items: center;
`;

const yellowText = css`
  color: var(--yellow-4);
  text-align: right;
`;

const buttonStyle = css`
  background: var(--very-dark-violet-5);
`;

const HeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  background: var(--very-dark-violet-200);
  padding: 12px 16px;
  border-radius: 6px 6px 0px 0px;
`;

const HeaderContainerMobile = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled(Table)`
  background: var(--very-dark-violet);
`;
const alignRight = css`
  text-align: right;
`;

const Icon = styled(BetsIcon)`
  padding-top: 10px;
`;

const TableRow = styled(Table.Row)<{ invertedBackground: boolean }>`
  background: var(--very-dark-violet-3);
`;

export const BetTickerModel = () => {
  return (
    <>
      <div style={{ color: 'var(--white)', marginBottom: '12px' }}>
        <h2>Desktop</h2>
      </div>
      <div>
        <TableContainer>
          <HeaderContainer>
            <Title>
              <Icon />
              Bets
            </Title>
            <Tabs
              tabOptions={tabOptions}
              tabOnclickHandler={(tabName: string) => alert(tabName)}
              buttonStyle={buttonStyle}
            />
          </HeaderContainer>

          <TableParent cellSpacing={0}>
            <Table.Body>
              <TableRow invertedBackground={true}>
                <Table.Header>Game</Table.Header>
                <Table.Header>Player/Clan</Table.Header>
                <Table.Header>Time</Table.Header>
                <Table.Header>Wager</Table.Header>
                <Table.Header>Multiplier</Table.Header>
                <Table.Header headerStyles={alignRight}>Payout</Table.Header>
              </TableRow>
              {mockData.map((data, index) => {
                return (
                  <TableRow
                    key={`data_bets_${index}`}
                    invertedBackground={index % 2 === 1 ? true : false}
                  >
                    <Table.Data>
                      <FlexData>
                        <Image
                          src={`${assets}/images/${data.game.imageURL}`}
                          alt="game_1"
                          width={32}
                          height={40}
                          style={{ marginRight: '12px' }}
                        />
                        {data.game.name}
                      </FlexData>
                    </Table.Data>
                    <Table.Data>
                      <FlexData>
                        <Image
                          src={`${assets}/images/${data.clan.image}`}
                          alt="game_2"
                          width={30}
                          height={30}
                          style={{ marginRight: '12px' }}
                        />
                        {data.clan.name}
                      </FlexData>
                    </Table.Data>
                    <Table.Data>{data.time}</Table.Data>
                    <Table.Data>€{data.wager}</Table.Data>
                    <Table.Data>{data.multiplier}x</Table.Data>
                    <Table.Data dataStyles={yellowText}>€{data.payout}</Table.Data>
                  </TableRow>
                );
              })}
            </Table.Body>
          </TableParent>
        </TableContainer>
      </div>

      <div style={{ color: 'var(--white)', margin: '24px 0px 12px 0px' }}>
        <h2>Mobile</h2>
      </div>
      <div style={{ width: '336px' }}>
        <TableContainer>
          <HeaderContainerMobile>
            <TitleMobile>
              <BetsIcon />
              Bets
            </TitleMobile>
            <TabsMobile
              tabOptions={tabOptions}
              tabOnclickHandler={(tabName: string) => alert(tabName)}
              buttonStyle={buttonStyle}
            />
          </HeaderContainerMobile>

          <TableParent cellSpacing={0}>
            <Table.Body>
              <Table.Row invertedBackground={true}>
                <Table.Header>Game</Table.Header>
                <Table.Header>Multiplier</Table.Header>
                <Table.Header headerStyles={alignRight}>Payout</Table.Header>
              </Table.Row>
              {mockData.map((data, index) => {
                return (
                  <TableRow
                    key={`data_bets_${index}`}
                    invertedBackground={index % 2 === 1 ? true : false}
                  >
                    <Table.Data>
                      <FlexData>
                        <Image
                          src={`${assets}/images/${data.game.imageURL}`}
                          alt="game_1"
                          width={32}
                          height={40}
                          style={{ marginRight: '12px' }}
                        />
                        {data.game.name}
                      </FlexData>
                    </Table.Data>
                    <Table.Data>{data.multiplier}x</Table.Data>
                    <Table.Data dataStyles={yellowText}>€{data.payout}</Table.Data>
                  </TableRow>
                );
              })}
            </Table.Body>
          </TableParent>
        </TableContainer>
      </div>
    </>
  );
};
