import AuthGuard  from './auth-guard';

 const WithAuthGuard = (Component) => (props) => {
  return(<AuthGuard><Component {...props} /></AuthGuard>)
 }

WithAuthGuard.displayName = 'WithAuthGuard';
export default WithAuthGuard;