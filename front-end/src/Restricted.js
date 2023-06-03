import CreateItemForm from "./components/CreateItemForm";
import withAuthentication from "./utils/withAuthentication";

const CreateItem = withAuthentication(CreateItemForm);

export default CreateItem;
