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
          minHeight: '90vh',
          backgroundColor: '#051706',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5vh 5vw',
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(60px, 6vw, 75px)',
              lineHeight: 1.15,
            }}
          >
            Bring PEPU Notifications to MetaMask
          </div>

          <ConnectButton onClick={requestSnap}>
            {!installedSnap ? 'Connect' : 'Connected'}
          </ConnectButton>
        </div>

        {/* Right column */}
        <div
          style={{
            flex: '1 1 300px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="https://pepeunchained.com/assets/images/svg-icons/broken_chains.gif"
            style={{
              width: '100%',
              maxWidth: '350px',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
