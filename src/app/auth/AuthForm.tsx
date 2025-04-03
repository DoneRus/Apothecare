import { useRouter } from 'next/router';

const AuthForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const type = form.getAttribute('data-type') || 'unknown';

    try {
      // For now, we'll simulate an authentication process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`${type} successful`, formData);
      
      router.push('/landing');
    } catch (err) {
      console.error('Authentication failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields go here */}
    </form>
  );
};

export default AuthForm; 