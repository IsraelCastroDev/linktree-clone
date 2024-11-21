export type ErrorMessageProps = {
  message: string | undefined;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (message)
    return <p className="text-red-500 text-sm font-semibold">{message}</p>;
}
