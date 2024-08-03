import React from 'react';
import { styled } from '@mui/material/styles';

import { Container } from '../../Atoms/Container';
import { LiveButton } from '../../Molecules/HomePage';
import Image from 'next/image';
interface DataItem {
  game: string;
  player: string;
  time: string;
  wager: {
    value: string;
    icon: string;
  };
  multiplier: string;
  payout: {
    value: string;
    logo: string;
  };
}

interface DataTableProps {
  data: DataItem[];
}

const TableContainer = styled('div')({});

const TableHeaderColumn = styled(Container)({
  width: '12%',
  '@media screen and (max-width:1100px)': {
    width: '16%'
  },
  '@media screen and (max-width:900px)': {
    ':nth-of-type(3), :nth-of-type(5)': {
      display: 'none'
    },
    width: '25%'
  },
  '@media screen and (max-width:479px)': {
    ':nth-of-type(2),:nth-of-type(3), :nth-of-type(4), :nth-of-type(5)': {
      display: 'none'
    },
    width: '50%'
  }
});
const TableContent = styled(Container)({});

const TableContentRow = styled(Container)({
  borderRadius: '10px',
  padding: '13px 0',
  paddingLeft: '28px',
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'space-between',
  '&:nth-of-type(odd)': {
    background: 'var(--very-dark-violet-100)'
  },
  '@media screen and (max-width:900px)': {
    paddingLeft: '20px'
  },
  '@media screen and (max-width:479px)': {
    paddingLeft: '17px',
    paddingright: '17px'
  }
});

const TableHeader = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: '28px',
  marginBottom: '7px',
  flexWrap: 'wrap',
  '& span': {
    fontWeight: 400,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-14)',
    color: 'var(--dark-blue)'
  },
  '@media screen and (max-width:900px)': {
    paddingLeft: '20px'
  }
});

const TableContentData = styled(Container)({
  display: 'flex',
  width: '12%',
  '& span': {
    width: '60%',
    fontWeight: 400,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-14)',
    color: 'var(--white)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '@media screen and (max-width:900px)': {
      fontSize: 'var(--font-size-13)'
    },
    '@media screen and (max-width:400px)': {
      fontSize: 'var(--font-size-11)'
    },
    '& img': {
      overflow: 'visible',
      width: '100%',
      height: 'auto'
    }
  },
  '@media screen and (max-width:1100px)': {
    width: '16%'
  },
  '@media screen and (max-width:900px)': {
    '&.time, &.wager': {
      display: 'none'
    },
    width: '25%'
  },
  '@media screen and (max-width:479px)': {
    '&.time, &.wager, &.player, &.multiplier': {
      display: 'none'
    },
    width: '50%'
  }
});

const generateHeader = (headerTitles: string[]) => {
  return headerTitles.map((title) => (
    <TableHeaderColumn key={title}>
      <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
    </TableHeaderColumn>
  ));
};

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const headerTitles = Object.keys(data[0]);
  return (
    <>
      <LiveButton />
      <TableContainer>
        <TableHeader>{generateHeader(headerTitles)}</TableHeader>
        <TableContent>
          {data.map((item, index) => (
            <TableContentRow key={index}>
              <TableContentData className="game">
                <span>{item.game}</span>
              </TableContentData>
              <TableContentData className="player">
                <span>{item.player}</span>
              </TableContentData>
              <TableContentData className="time">
                <span>{item.time}</span>
              </TableContentData>
              <TableContentData className="wager">
                <span>{item.wager.value}</span>
                <span style={{ marginLeft: '10px', height: '14px', width: '14px' }}>
                  <Image src={item.wager.icon} alt={`wager-icon for ${item.game}`} />
                </span>
              </TableContentData>
              <TableContentData className="multiplier">
                <span>{item.multiplier}x</span>
              </TableContentData>
              <TableContentData className="payout">
                <span>{item.payout.value}</span>
                <span style={{ marginLeft: '10px', height: '14px', width: '14px' }}>
                  <Image src={item.payout.logo} alt={`payout-logo for ${item.game}`} />
                </span>
              </TableContentData>
            </TableContentRow>
          ))}
        </TableContent>
      </TableContainer>
    </>
  );
};
