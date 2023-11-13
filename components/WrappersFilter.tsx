import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { WrapperListFilter } from "../types"

interface Props {
  value: WrapperListFilter,
  onChange: (filter: WrapperListFilter) => void,
}

export default function WrappersFilter({
  value,
  onChange
}: Props) {
  return (
    <div className="my-4 w-100 text-center">
      <div className="row">
        <div className="col-0 col-md-2 col-lg-3 col-xl-4"></div>
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
       
        </div>
        <div className="col-0 col-md-2 col-lg-3 col-xl-4"></div>
      </div>
    </div>
  )
}
