
interface WeddingSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const WeddingSection = ({ id, className = "", children }: WeddingSectionProps) => {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
};
