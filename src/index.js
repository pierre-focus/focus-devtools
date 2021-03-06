import React , { Component , PropTypes } from 'react';
import { Provider as StoreProvider} from 'react-redux';
import {saveAnswer, initQuestion} from './actions/push-question-actions';
import store from './store';
import FocusDevToolsContent from './components/focus-dev-tools';
import DevPanel from './components/dev-panel';
import  FocusDevDock from './components/focus-dev-dock';
import logger from './logger/dispatch-logger';
import {init as initFirebase} from './service/firebase'; 

let USER;
try{
  USER = __USER__
}catch(e){
  USER = 'NO_USER';
}

let PROJECT;
try{
  PROJECT = __PROJECT__
}catch(e){
  PROJECT = 'NO_PROJECT';
}


const FocusDevToolsPanel  = props => {
  const {toggleVisibilityKey, ...otherProps} = props;
  return (
    <FocusDevDock toggleVisibilityKey={toggleVisibilityKey}>
      <FocusDevToolsContent {...otherProps} />
    </FocusDevDock>
  );
};
FocusDevToolsPanel.displayName = 'FocusDevToolsPanel';


const FocusDevTools = (props) => {
  initFirebase();
  const DevTools = props.isPanel ? FocusDevToolsPanel : FocusDevToolsContent;
  return (
    <DevPanel project={props.project} user={props.user}>
      <StoreProvider store={store}>
        <DevTools
          getStores={props.getStores}
          routes={props.routes}
          titlePadding={'20px'}
          contentWidth={props.isPanel ? '100%' : '400px'}
          toggleVisibilityKey={props.toggleVisibilityKey}
          initQuestion={() => initQuestion()}
          sendGrade={grade => saveAnswer(props.project, {date: new Date().getTime(), user: props.user, grade: grade})}
          isDebugDevTools={props.isDebugDevTools}
          paddingTop={props.paddingTop !== undefined ? props.paddingTop : 0}
        />
      </StoreProvider>
    </DevPanel>
  );
}

FocusDevTools.propTypes = {
  getStores: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  isPanel: PropTypes.bool.isRequired,
  toggleVisibilityKey: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  paddingTop: PropTypes.string,
  isDebugDevTools: PropTypes.bool
}

FocusDevTools.defaultProps = {
  isPanel: true,
  toggleVisibilityKey: 'ctrl-m',
  isDebugDevTools: false,
  user: USER,
  project: PROJECT
}
FocusDevTools.displayName = 'FocusDevTools';
FocusDevTools.VERSION = '0.1.O';
FocusDevTools.logger = logger;

export default FocusDevTools;
