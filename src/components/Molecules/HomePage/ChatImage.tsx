import { assets } from '@/config/assets';
import Image from 'next/image';

export const ChatImage = () => {
  return <Image width={24} height={25} src={`${assets}/images/chat-icon.svg`} alt="Chat" />;
};
