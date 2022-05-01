export default {
  add(state, book) {
    state.books.push({
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      publisher: book.publisher,
      copy_version: book.copy_version,
      notes: book.notes,
    });
  },
  remove(state, book) {
    state.books.splice(state.books.indexOf(book), 1);
  },
};
