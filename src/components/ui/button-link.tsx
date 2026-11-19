import Link from 'next/link';
import { buttonClass, type ButtonSize, type ButtonVariant } from '@/components/ui/button-styles';

type ButtonLinkProps = React.ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize };

/** Link bergaya tombol. Pakai ini, bukan <Link><button/></Link> (elemen interaktif tidak boleh bersarang). */
export function ButtonLink({ variant = 'primary', size = 'md', className = '', ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
