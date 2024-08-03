import Table from '@/components/Atoms/Table/Table';
import { assets } from '@/config/assets';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { getBorderStyle } from './utils';
import InfoIconSolid from '@/components/Atoms/InfoIconSolid';
import useUniboData from '@/hooks/f1-leaderboad/useUniboData';
import {
  HeaderContainer,
  Title,
  alignRightHeader,
  alignRightData,
  MainContainer,
  FooterContainer,
  InfoSection,
  InfoText,
  RulesButton
} from './F1.Styles';
import Link from 'next/link';
import { useLoader } from '@/hooks/useLoader';
import Pagination from '@/components/Atoms/Pagination/Pagination';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';

const ENTRIES_PER_PAGE = 25;
const userNames = [
  'rosanne',
  'Dogroll',
  'Newzealand',
  'andrewtate',
  'fran_test',
  'paul1',
  'Gianluca17',
  'Danny',
  'dtran19',
  'Kikikachoo',
  'Brummy',
  'Mikiii'
];
const F1Table: React.FC = () => {
  const { data: playersData, loading } = useUniboData();
  const { loadingWrapper } = useLoader('coin');
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportButton, setShowExportButton] = useState(false);

  const adjustedPlayersData = playersData?.slice(0, 50) || [];

  const totalPages = Math.ceil(adjustedPlayersData.length / ENTRIES_PER_PAGE);

  const shouldShowPagination = adjustedPlayersData.length > ENTRIES_PER_PAGE;

  const handlePageClick = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const paginatedData = playersData
    ? playersData.slice((currentPage - 1) * ENTRIES_PER_PAGE, currentPage * ENTRIES_PER_PAGE)
    : [];
  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
  const exportToCsv = () => {
    if (!playersData) return;
    const csvRows = playersData.map((data, index) => {
      const playerNumber = startIndex + index + 1;
      return `${playerNumber},${data.player_id},${data.player_username},${data.score}`;
    });

    const csvDataString = csvRows.join('\n');
    const csvDataBlob = new Blob([csvDataString], { type: 'text/csv' });
    const csvDataUrl = URL.createObjectURL(csvDataBlob);
    const link = document.createElement('a');
    link.href = csvDataUrl;
    link.download = 'leaderboard.csv';
    link.click();
  };

  useEffect(() => {
    const username = Cookies.get('username');
    if (username && userNames.map((name) => name.toLowerCase()).includes(username.toLowerCase())) {
      setShowExportButton(true);
    }
  }, []);

  if (loading) return loadingWrapper;

  return (
    <MainContainer>
      {showExportButton && (
        <Button
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={exportToCsv}
        >
          Export to CSV
        </Button>
      )}
      <Table mediaQueryPadding="0px" showPadding={false}>
        <HeaderContainer>
          <Image
            src={`${assets}/images/f1-leaderboard/title-logo.svg`}
            width={58}
            height={56}
            alt="leaderboard-icon"
          />
          <Title size="b2" type="Paragraph">
            Tournament Leaderboard
          </Title>
        </HeaderContainer>
        <Table.Parent>
          <Table.Body>
            <Table.Row invertedBackground>
              <Table.Header>#</Table.Header>
              <Table.Header>Username</Table.Header>
              <Table.Header headerStyles={alignRightHeader}>Points</Table.Header>
            </Table.Row>
            {paginatedData.map((data, index) => {
              const applySpecialStyles = currentPage === 1 && index < 3;

              const borderStyle = applySpecialStyles ? getBorderStyle(index) : undefined;

              return (
                <Table.Row key={`data_m4_${index}`}>
                  <Table.Data dataStyles={borderStyle}>{startIndex + index + 1}</Table.Data>
                  <Table.Data>{data.player_username}</Table.Data>
                  <Table.Data dataStyles={alignRightData}>{data.score}</Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Parent>
        {shouldShowPagination && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              height: '53px',
              paddingBottom: '15px'
            }}
          >
            <Pagination pages={totalPages} onClick={handlePageClick} />
          </div>
        )}
      </Table>

      <FooterContainer>
        <InfoSection>
          <InfoIconSolid />
          <InfoText>Rules</InfoText>
        </InfoSection>
        <Link
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
          href="promotions/magic-round-tournament"
        >
          <RulesButton showIcon={false}>See Rules</RulesButton>
        </Link>
      </FooterContainer>
    </MainContainer>
  );
};

export default F1Table;
