import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import <%=componentName%> from '..<%=componentDirectory%>/<%=componentName%>';

storiesOf('<%= componentName %>', module)
  .add('<%= componentName %>', () => {
  return (
    <<%=componentName%>/>
  )
});