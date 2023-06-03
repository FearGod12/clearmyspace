import CreateItemForm from "./pages/CreateItemForm";
import withAuthentication from "./utils/withAuthentication";

const CreateItem = withAuthentication(CreateItemForm);

export default CreateItem;
