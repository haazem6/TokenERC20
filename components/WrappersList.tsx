import WrapperCard from "./WrapperCard"
import { useTotalWrappersCount } from "../hooks"
import Link from 'next/link'
import Alert from "react-bootstrap/Alert"
import WrappersFilter from "./WrappersFilter"
import { WrapperListFilter } from "../types"
import { useState } from "react"


export default function WrappersList() {
  //  manage the filter value
  const [filter, setFilter] = useState<WrapperListFilter>("all");

  //  hook to get the total number of wrappers
  const totalWrappers: number = useTotalWrappersCount()

  // Creating an array of wrapper IDs in descending order
  const wrapperIds: number[] = Array.from(Array(totalWrappers).keys()).sort((a: number, b: number) => b - a)

  
  return (
    <div>
      {/* Component for filtering the list of wrappers */}
      <WrappersFilter 
        value={filter}
        onChange={(f: WrapperListFilter) => setFilter(f)}
      />

      {/* Container for displaying wrapper cards */}
      <div className="row">
        {wrapperIds.map((wrapperId: number) => (
          <div 
            className="col-12"
            key={"wrapper-card-" + wrapperId} 
          >
            {/* Component for rendering individual wrapper card */}
            <WrapperCard 
              wrapperId={wrapperId}
              filter={filter} 
            />
          </div>
        ))}

        {/* Displaying a message if there are no wrappers */}
        {wrapperIds.length <= 0 && (
          <Alert 
            className="my-4 text-center "
            variant="primary"
          >
            <span>{"There are no wrappers yet."}</span>
            {" 🪄 "}
            {/* Link to navigate to the factory page for creating the first wrapper */}
            <Link href={"/factory"}>
              {"Create the first one"}
            </Link>
          </Alert>
        )}
      </div>
    </div>
  )
}
