import React from 'react'
import { Book } from '../components/Book'
import styles from '../styles/ListBooks.module.css'

const books = [
	{
		id: 5,
		title: "kamasutra kdjflasdjflasdjlfkasj",
		author: "test author fkasdjflkasdjflasdjflkajsdlfkajsdklçfjasdlfa",
		description: "test lsdjflaksdjflkasdjfklasjdfklasjsdfklajsdklfjasdklfjasdklfjaskldçfjalksdçfjalskdjfalçskdjfklasdjflaksdjfklçasdjflçkasjdfçklasjdflçksajdfklçajsdlçkfjasdljfdescription"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
	{
		id: 5,
		title: "kamasutra",
		author: "test author",
		description: "test description"
  },
]

export default () => {
  return (
    <div className={styles.container}>
      { books.map(book => <Book title={book.title} description={book.description} author={book.author} key={book.id} />) }
    </div>
  )
}
