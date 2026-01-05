import styled from 'styled-components';

import { useMetaMask, useRequestSnap } from '../hooks';

const Index = () => {
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();

  return (
    <>
      <div
        style={{
          height: '90vh',
          // backgroundImage:
          //   'url("https://cdn.sanity.io/images/9zunswfd/production/b3a7db601127f269d420115fcbcd6cbfda42ea3e-1174x957.webp")',
          // backgroundPosition: 'center',
          // backgroundSize: 'min(100vw, 100vh)',
          // backgroundRepeat: 'no-repeat',
          backgroundColor: '#051706',
          display: 'flex',
          flexDirection: 'column', // stack children vertically
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '2.5vw',
          }}
        >
          Bring PEPU Notifications to MetaMask.
        </div>

        <div
          onClick={requestSnap}
          style={{
            marginTop: '50px',
            fontSize: '20px',
            border: '1px solid white',
            padding: '20px 40px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {!installedSnap ? 'Connect' : 'Connected'}
        </div>
      </div>
    </>
  );
};

export default Index;
