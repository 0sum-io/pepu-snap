import styled from 'styled-components';

import { useMetaMask, useRequestSnap } from '../hooks';

const Index = () => {
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();

  const ConnectButton = styled.div`
    margin-top: 50px;
    font-size: 20px;
    padding: 20px 40px;
    border-radius: 99px;
    cursor: pointer;
    background-color: #42a32a;
    color: black;
    font-weight: bold;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  `;

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

        <ConnectButton onClick={requestSnap}>
          {!installedSnap ? 'Connect' : 'Connected'}
        </ConnectButton>
      </div>
    </>
  );
};

export default Index;
