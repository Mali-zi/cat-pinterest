import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="grow" size="sm" variant="primary" className="me-2" />
      <Spinner animation="grow" size="sm" variant="primary" className="me-2" />
      <Spinner animation="grow" size="sm" variant="primary" />
      <span className="h4 ps-3 primary">Loading...</span>
    </div>
  )
}
