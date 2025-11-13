const Form = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                অর্ডার তথ্য
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
                অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, লিখে অর্ডার কনফার্ম করুন বাটনে ক্লিক করুন
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        আপনার নাম *
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary outline-none transition-colors"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        // required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        আপনার মোবাইল নম্বর *
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary outline-none transition-colors"
                        placeholder="013xxxxxxxx"
                        // required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        আপনার সম্পূর্ণ ঠিকানা *
                    </label>
                    <textarea
                        name="address"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                        placeholder="বাড়ি/ফ্ল্যাট নং, রাস্তা, এলাকা, থানা, জেলা"
                        // required
                    />
                </div>
            </div>
        </div>
    );
}

export default Form