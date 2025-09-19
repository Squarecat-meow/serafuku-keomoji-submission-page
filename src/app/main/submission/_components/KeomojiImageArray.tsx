export default function KeomojiImageArray({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="w-full sm:w-36 md:w-36 lg:w-48 aspect-square bg-black p-2 sm:p-4 grid place-items-center rounded-xl">
        <img
          src={imgUrl}
          alt="업로드한 커모지"
          className="h-full aspect-square object-contain"
        />
      </div>
      <div className="w-full sm:w-36 md:w-36 lg:w-48 aspect-square bg-gray-500 p-2 sm:p-4 grid place-items-center rounded-xl">
        <img
          src={imgUrl}
          alt="업로드한 커모지"
          className="h-full aspect-square object-contain"
        />
      </div>
      <div className="w-full sm:w-36 md:w-36 lg:w-48 aspect-square bg-gray-200 p-2 sm:p-4 grid place-items-center rounded-xl">
        <img
          src={imgUrl}
          alt="업로드한 커모지"
          className="h-full aspect-square object-contain"
        />
      </div>
      <div className="w-full sm:w-36 md:w-36 lg:w-48 aspect-square bg-white p-2 sm:p-4 grid place-items-center rounded-xl">
        <img
          src={imgUrl}
          alt="업로드한 커모지"
          className="h-full aspect-square object-contain"
        />
      </div>
    </div>
  );
}
