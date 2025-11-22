import { operationsApi } from "../api/operationsApi";

export default function useOperationActions() {
	const validate = async (id) => {
		return operationsApi.validateOperation(id);
	};

	const cancel = async (id) => {
		return operationsApi.cancelOperation(id);
	};

	return { validate, cancel };
}
