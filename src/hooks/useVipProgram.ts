import client from '@/graphql/client';
import { GET_ALL_VIP_PROGRAMS } from '@/graphql/queries/vipPrograms';
import { useEffect, useState } from 'react';

export const useVipProgram = () => {
  const [vipProgramLevel, setVipProgramLevel] = useState<any>(null);
  const [vipProgramSteps, setVipProgramSteps] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_ALL_VIP_PROGRAMS
        });

        setVipProgramLevel(data.vipProgram.data.attributes.Level);
        setVipProgramSteps(data.vipProgram.data.attributes.Steps);
      } catch (error) {
        console.error('Error fetching VIP program data:', error);
      }
    };
    fetchData();
  }, []);

  return {
    vipProgramLevel,
    vipProgramSteps
  };
};
