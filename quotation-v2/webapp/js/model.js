function Person(id) {
	this.id = id;
	
	this.setDateOfBirth = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.dateOfBirth = values[0].value;
			}
		}
	};

	this.setDateOfDeath = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.dateOfDeath = values[0].value;
			}
		}
	};

	this.setPlaceOfBirth = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.placeeOfBirth = values[0].text;
			}
		}
	};

	this.setPlaceOfDeath = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.placeOfDeath = values[0].text;
			}
		}
	};

	this.setName = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.name = values[0].text;
			}
		}
	};
	
	this.setNotableFor = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				var value = property.values[0];
				this.notableFor = value.text;
			}
			
			/*
			console.debug("id: " + value.id);
			if (!isNotableForExclusion(value.id)) {
				this.notableFor = value.text;
			}
			*/
		}
	};
	
	this.setDescription = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.description = values[0];
			}
		}
	};
	
	this.setImage = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.image = values[0].id;
			}
		}
	};
	
	this.setQuotations = function(property) {
		if (property) {
			this.quotations = property.values;
		}
	};
}

function Subject(id) {
	this.id = id;
	
	this.setDescription = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.description = values[0];
			}
		}
	};
	
	this.setImage = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.image = values[0].id;
			}
		}
	};
	
	this.setName = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.name = values[0].text;
			}
		}
	};
	
	this.setQuotations = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.quotations = property.values;
			}
		}
	};
}

function Source(id) {
	this.id = id;
	
	this.setName = function(name) {
		this.name = name;
	};
	
	this.setType = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.type = values[0].text;
			}
		}
	};
}

function Quotation(id) {
	this.id = id;

	this.setQuotation = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.quotation = values[0].value;
			}
		}
	};
	
	this.setSpokenByCharacter = function(property) {
		if (property) {
			var values = property.values;
			if (values) {
				this.spokenByCharacter = property.values[0].text;
			}
		}
	};
	
	this.setSource = function(property) {
		if (property) {
			this.source = new Source(property.values[0].id);
			this.source.setName(property.values[0].text);
		}
	};
	
	this.setAuthors = function(property) {
		if (property) {
			var authors = [];
			
			for (var i = 0; i < property.values.length; i++) {
				var value = property.values[i];

				var author = new Person(value.id);
				author.name = value.text;
				authors.push(author);
			}
			
			this.authors = authors;
		}
	};
	
	this.setSubjects = function(property) {
		if (property) {
			var subjects = [];
			
			for (var i = 0; i < property.values.length; i++) {
				var value = property.values[i];

				var subject = new Subject(value.id);
				subject.name = value.text;
				subjects.push(subject);
			}
			
			this.subjects = subjects;
		}
	};
}
