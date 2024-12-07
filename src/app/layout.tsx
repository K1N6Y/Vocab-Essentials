import '../styles/globals.css';
import RootClientComponent from '@/components/RootClientComponent';

export const metadata = {
  title: 'Vocab Essentials',
  description: 'Master your vocabulary effortlessly!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootClientComponent>{children}</RootClientComponent>
      </body>
    </html>
  );
}
