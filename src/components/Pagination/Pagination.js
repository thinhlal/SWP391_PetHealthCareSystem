function Pagination() {
  return (
    <nav aria-label='...'>
      <ul className='pagination'>
        <li className='page-item disabled'>
          <a
            className='page-link'
            href='#123'
          >
            Previous
          </a>
        </li>
        <li className='page-item'>
          <a
            className='page-link'
            href='#123'
          >
            1
          </a>
        </li>
        <li
          className='page-item active'
          aria-current='page'
        >
          <a
            className='page-link'
            href='#123'
          >
            2
          </a>
        </li>
        <li className='page-item'>
          <a
            className='page-link'
            href='#123'
          >
            3
          </a>
        </li>
        <li className='page-item'>
          <a
            className='page-link'
            href='#123'
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
