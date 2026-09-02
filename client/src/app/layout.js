import './globals.css';

export const metadata = {
  title: 'RuralRise | Empowering Rural Entrepreneurs',
  description: 'A digital platform helping rural entrepreneurs in Maharashtra showcase their products, build a credible brand, and reach wider markets.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
