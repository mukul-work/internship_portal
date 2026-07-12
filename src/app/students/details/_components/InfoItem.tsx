"use client";

interface InfoItemProps {
  title: string;
  value?: string | number | null;
}

export default function InfoItem({ title, value }: InfoItemProps) {
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      <p
        className="break-words text-base font-semibold text-foreground"
        title={value?.toString()}
      >
        {value && value.toString().trim().length > 0 ? value : "Not Available"}
      </p>
    </div>
  );
}
