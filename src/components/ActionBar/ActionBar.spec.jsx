import React from 'react';

import ActionBar from './ActionBar';
import Mic from '../Icons/Mic';
import Video from '../Icons/Video';

const defaultRequiredProps = {
  toggleMicrophone: () => {},
  toggleCamera: () => {},
  toggleScreenSharing: () => {},
  endCall: () => {},
};

describe('<ActionBar /> component', () => {
  it('should render without crashing', () => {
    const component = shallow(<ActionBar {...defaultRequiredProps} />);

    expect(component).toHaveLength(1);
  });

  it('should render <Mic /> component when microphone turned on', () => {
    const component = shallow(
      <ActionBar
        {...defaultRequiredProps}
        isMicrophoneEnabled
      />,
    );

    expect(component.find(Mic)).toHaveLength(1);
  });

  it('should render <Video /> component when camera turned on', () => {
    const component = shallow(
      <ActionBar
        {...defaultRequiredProps}
        isCameraEnabled
      />,
    );

    expect(component.find(Video)).toHaveLength(1);
  });
});
