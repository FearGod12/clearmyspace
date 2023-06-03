import React from 'react';
import CreateItemForm from './CreateItemForm';
import withAuthentication from './withAuthentication';

const CreateItem = withAuthentication(CreateItemForm);

export default CreateItem;
