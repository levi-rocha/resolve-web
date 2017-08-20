"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = (function () {
    function Post(id, title, content, author, authorUsername, contentPreview, voteIds, voteCount, comments, solutions) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorUsername = authorUsername;
        this.contentPreview = contentPreview;
        this.voteIds = voteIds;
        this.voteCount = voteCount;
        this.comments = comments;
        this.solutions = solutions;
    }
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.js.map