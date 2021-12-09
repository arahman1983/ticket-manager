import nodata from '../../assests/images/nodata.png'
export default function EmptyTableError () {
  return(
    <tr>
      <td colSpan={5} className="px-0 text-center">
          <img src={nodata} alt="No Data" />
        </td>
    </tr>
  )
}