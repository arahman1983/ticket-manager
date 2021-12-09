import styles from './paging.module.css'
import {  FiChevronRight, FiChevronLeft, FiChevronsRight, FiChevronsLeft} from 'react-icons/fi'
type Props = {
  pages: number,
  currentPage: number,
  handleFirstPageClick: ()=> void,
  handlePrevPageClick : ()=> void,
  handleNextPageClick : ()=> void,
  handleLastPageClick : ()=> void,
}

export default function Paging({pages, currentPage, handleFirstPageClick, handlePrevPageClick, handleNextPageClick, handleLastPageClick}:Props){
  return(
    <div className={styles.paging}>
      <button className={styles.pagingBtn} onClick={handleFirstPageClick} disabled={currentPage === 1}>{<FiChevronsLeft />}</button>
      <button className={styles.pagingBtn} onClick={handlePrevPageClick} disabled={currentPage === 1}>{<FiChevronLeft />}</button>
      <p className='px-3'>Page {currentPage} from {pages}</p>
      <button className={styles.pagingBtn} onClick={handleNextPageClick} disabled={currentPage === pages}>{<FiChevronRight/>}</button>
      <button className={styles.pagingBtn} onClick={handleLastPageClick} disabled={currentPage === pages}>{<FiChevronsRight/>}</button>
    </div>
  )
}