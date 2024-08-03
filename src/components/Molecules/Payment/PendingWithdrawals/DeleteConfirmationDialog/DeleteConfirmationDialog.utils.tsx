import axios from 'axios';

export const deleteTransaction = async (transactionId: string | null): Promise<boolean> => {
  if (!transactionId) {
    throw new Error('Error: transactionId is required');
  }

  try {
    await axios.delete(`/api/all-transactions/${transactionId}`);
    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return false;
  }
};
